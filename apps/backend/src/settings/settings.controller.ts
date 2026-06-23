import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { SettingsService, SettingInput } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  /**
   * GET /api/settings - Retorna todas as configurações agrupadas por grupo
   */
  @Get()
  async findAll() {
    return this.settingsService.findAll();
  }

  /**
   * GET /api/settings/group/:group - Retorna configurações de um grupo específico
   * Exemplos de grupos: store, correios, mercadopago, nfe, whatsapp
   */
  @Get('group/:group')
  async findByGroup(@Param('group') group: string) {
    return this.settingsService.findByGroup(group);
  }

  /**
   * GET /api/settings/:key - Retorna uma configuração individual pelo key
   */
  @Get(':key')
  async findByKey(@Param('key') key: string) {
    return this.settingsService.findByKey(key);
  }

  /**
   * PUT /api/settings - Atualiza múltiplas configurações em lote
   * Body: [{ key, value, group, label? }]
   */
  @Put()
  async upsertMany(@Body() settings: SettingInput[]) {
    return this.settingsService.upsertMany(settings);
  }

  /**
   * PUT /api/settings/:key - Atualiza ou cria uma configuração individual
   * Body: { value: string, group: string, label?: string }
   */
  @Put(':key')
  async upsert(
    @Param('key') key: string,
    @Body() body: { value: string; group: string; label?: string },
  ) {
    return this.settingsService.upsert(key, body.value, body.group, body.label);
  }
}
