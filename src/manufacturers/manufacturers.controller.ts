import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ManufacturersService } from './manufacturers.service';
import { ManufacturersResponseDto } from './dto/manufacturer.dto';
import { FilterManufacturersDto } from './dto/filter-manufacturers.dto';

@ApiTags('manufacturers')
@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los fabricantes de vehículos',
    description: 'Retorna lista completa de fabricantes desde la API de NHTSA',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de fabricantes obtenida exitosamente',
    type: ManufacturersResponseDto,
  })
  getAllManufacturers(): Observable<ManufacturersResponseDto> {
    return this.manufacturersService.getAllManufacturers();
  }

  @Get('filtered')
  @ApiOperation({
    summary: 'Obtener fabricantes con filtros',
    description:
      'Filtros por país, nombre, tipo de vehículo, paginación y ordenamiento',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista filtrada de fabricantes',
    type: ManufacturersResponseDto,
  })
  getFilteredManufacturers(
    @Query() filters: FilterManufacturersDto,
  ): Observable<ManufacturersResponseDto> {
    return this.manufacturersService.getFilteredManufacturers(filters);
  }

  @Get('by-country')
  @ApiOperation({
    summary: 'Obtener fabricantes por país',
    description: 'Retorna fabricantes de un país específico',
  })
  @ApiQuery({
    name: 'country',
    description: 'Nombre del país (ej: UNITED STATES, GERMANY)',
    example: 'UNITED STATES',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de fabricantes del país especificado',
    type: ManufacturersResponseDto,
  })
  getManufacturersByCountry(
    @Query('country') country: string,
  ): Observable<ManufacturersResponseDto> {
    return this.manufacturersService.getManufacturersByCountry(country);
  }
}
