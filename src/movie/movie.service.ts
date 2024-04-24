import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie: Movie = new Movie();
    movie.title = createMovieDto.title;
    movie.year = createMovieDto.year;
    movie.description = createMovieDto.description;

    return this.movieRepository.save(movie);
  }

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  findOne(id: number): Promise<Movie> {
    return this.movieRepository.findOneBy({ id });
  }

  update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie: Movie = new Movie();
    movie.title = updateMovieDto.title;
    movie.year = updateMovieDto.year;
    movie.description = updateMovieDto.description;
    movie.id = id;

    return this.movieRepository.save(movie);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.movieRepository.delete({ id });
  }
}
