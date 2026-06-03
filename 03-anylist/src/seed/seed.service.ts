import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {

  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  async executeSeed() {

    if (this.isProd) {
      throw new ForbiddenException('We cannot run SEED on Prod');
    }
    // Limpiar la base de datos BORRAR TODO

    // Crear usuarios

    // Crear items

    return true;
  }
}
