import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'Adciona um filme ao catalogo' })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Public()
  @ApiOperation({ summary: 'Mostra todos os filmes registrados no catálogo' })
  @Get()
  async findAll() {
    const movies = await this.movieService.findAll();
    if (!movies.length) {
      return {
        message: 'Nenhum filme registrado',
      };
    }
    return movies;
  }

  @Public()
  @ApiOperation({
    summary: 'Mostra um filme específico registrado no catálogo',
  })
  @ApiResponse({
    status: 200,
    description: 'Registro encontrado.',
    type: Movie,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const movie = await this.movieService.findOne(+id);
    if (!movie) {
      return {
        message: 'Filme não registrado',
      };
    }
    return this.movieService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Edita um filme registrado no catálogo',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @ApiOperation({
    summary: 'Deleta um filme registrado no catálogo',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
