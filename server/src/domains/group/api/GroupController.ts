import { UsingTechStackService } from '@domains/techstack/service/UsingTechStackService';
import { Body, Controller, Get, OnUndefined, Post, QueryParam } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { CreateGroupDto } from '../dto/CreateGroupDto';
import { GroupService } from '../service/GroupService';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { FilterdGroupDto } from '../dto/FilterdGroupDto';

@OpenAPI({
  tags: ['그룹'],
})
@Service()
@Controller('/group')
export class GroupController {
  constructor(
    @Inject()
    private readonly groupService: GroupService,
    @Inject()
    private readonly usingTechStackService: UsingTechStackService,
  ) {}

  @Get('/')
  @OnUndefined(200)
  @OpenAPI({
    summary: '필터링된 그룹을 조회하는 API',
    responses: {
      '200': {
        description: '그룹 조회 완료',
      },
    },
  })
  @ResponseSchema(FilterdGroupDto, { description: '필터링 그룹 조회 결과' })
  async getAll(
    @QueryParam('name') name: string,
    @QueryParam('category') category: number,
    @QueryParam('techstack') techstack: string,
  ) {
    const filterdGroups: FilterdGroupDto[] = await this.groupService.getFilterdGroups(
      name,
      category,
      techstack,
    );
    return filterdGroups;
  }

  @Post('/create')
  @OnUndefined(200)
  @OpenAPI({
    summary: '그룹을 생성하는 API',
  })
  async create(@Body() groupData: CreateGroupDto) {
    const createdGroup = await this.groupService.createGroup(groupData);
    this.usingTechStackService.createGroupUsingStack(createdGroup, groupData.usingTechStacks);
  }
}
