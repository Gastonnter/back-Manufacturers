import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import {
  ManufacturersResponseDto,
  NhtsaResponseDto,
  ManufacturerDto,
} from './dto/manufacturer.dto';
import { FilterManufacturersDto } from './dto/filter-manufacturers.dto';
import { ManufacturerFilterService } from './utils/manufacturer-filter.service';

@Injectable()
export class ManufacturersService {
  private readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  constructor(private readonly httpService: HttpService) {}

  getAllManufacturers(): Observable<ManufacturersResponseDto> {
    return this.httpService
      .get<NhtsaResponseDto>(`${this.baseUrl}/getallmanufacturers?format=json`)
      .pipe(
        map((response: AxiosResponse<NhtsaResponseDto>) => {
          const nhtsaData = response.data;
          const transformedManufacturers: ManufacturerDto[] =
            nhtsaData.Results.map((manufacturer) => ({
              country: manufacturer.Country,
              commonName: manufacturer.Mfr_CommonName,
              legalName: manufacturer.Mfr_Name,
              vehiclesType: manufacturer.VehicleTypes,
            }));

          return {
            count: nhtsaData.Count,
            message: nhtsaData.Message,
            manufacturers: transformedManufacturers,
          };
        }),
        catchError(() => {
          throw new HttpException(
            'Error fetching manufacturers from NHTSA API',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }

  getFilteredManufacturers(
    filters: FilterManufacturersDto,
  ): Observable<ManufacturersResponseDto> {
    return this.getAllManufacturers().pipe(
      map((response: ManufacturersResponseDto) => {
        // Apply filters using service
        const filteredManufacturers =
          ManufacturerFilterService.filterManufacturers(
            response.manufacturers,
            filters,
          );

        // Apply sorting using service
        const sortedManufacturers = ManufacturerFilterService.sortManufacturers(
          filteredManufacturers,
          filters.sortBy,
          filters.sortOrder,
        );

        // Apply pagination using service
        const paginationResult = ManufacturerFilterService.paginateResults(
          sortedManufacturers,
          filters.page || 1,
          filters.limit || 10,
        );

        return {
          count: filteredManufacturers.length,
          message: response.message,
          manufacturers: paginationResult.data,
          pagination: paginationResult.pagination,
        };
      }),
    );
  }

  getManufacturersByCountry(
    country: string,
  ): Observable<ManufacturersResponseDto> {
    return this.httpService
      .get<NhtsaResponseDto>(
        `${this.baseUrl}/getallmanufacturers?format=json&country=${encodeURIComponent(country)}`,
      )
      .pipe(
        map((response: AxiosResponse<NhtsaResponseDto>) => {
          const nhtsaData = response.data;
          const transformedManufacturers: ManufacturerDto[] =
            nhtsaData.Results.map((manufacturer) => ({
              country: manufacturer.Country,
              commonName: manufacturer.Mfr_CommonName,
              legalName: manufacturer.Mfr_Name,
              vehiclesType: manufacturer.VehicleTypes,
            }));

          return {
            count: nhtsaData.Count,
            message: nhtsaData.Message,
            manufacturers: transformedManufacturers,
          };
        }),
        catchError(() => {
          throw new HttpException(
            'Error fetching manufacturers by country from NHTSA API',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }
}
