import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'API Health Check',
    description: 'Verifica que el servidor está funcionando correctamente',
  })
  @ApiResponse({
    status: 200,
    description: 'El servidor está funcionando correctamente',
  })
  getHealthStatus(): { message: string; timestamp: string; status: string } {
    return {
      message: 'Vehicle Manufacturers API is running',
      timestamp: new Date().toISOString(),
      status: 'healthy',
    };
  }
}
