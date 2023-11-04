import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BookSearchModel } from './dto/book-search.dto';

export const BooksSearchQuery = createParamDecorator(
  (_: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { ISBN, title, authorName } = request.query as BookSearchModel;
    return { ISBN, title, authorName };
  },
);
