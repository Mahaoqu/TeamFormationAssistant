import { Controller, Get, Param, Post } from '@nestjs/common';
import { TeamService } from './team.service';

/**
 * team controller
 * which contains application logic and passing user input data to service.
 */

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  team_match() {
    return this.teamService.assign();
  }
  // @Post()
  // create(@Body() createTeamDto: CreateTeamDto) {
  //   return this.teamService.create(createTeamDto);
  // }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
  //   return this.teamService.update(+id, updateTeamDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.teamService.remove(+id);
  // }
}
