import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryMock } from '../__mocks__/category.mock';
import { CreateCategoryMock } from '../__mocks__/create-category.mock';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let repository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find: jest.fn().mockReturnValue([CategoryMock]),
            save: jest.fn().mockReturnValue(CategoryMock),
            findOne: jest.fn().mockReturnValue(CategoryMock),
          },
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should return all categories', async () => {
    const categories = await categoryService.findAll();

    expect(categories).toEqual([CategoryMock]);
  });

  it('should be crate category', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue(undefined);
    const category = await categoryService.create(CreateCategoryMock);

    expect(category).toEqual(CategoryMock);
  });

  it('should return category in findCategoryByName', async () => {
    const category = await categoryService.findCategoryByName(
      CreateCategoryMock.name,
    );

    expect(category).toEqual(CategoryMock);
  });

  it('should return error if not exist category in findCategoryByName', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue(undefined);

    expect(
      categoryService.findCategoryByName(CategoryMock.name),
    ).rejects.toThrowError();
  });
});
