import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const message = exception.message || 'Internal server error';

        if (exception instanceof NotFoundException) {
            response.status(status).json({
                statusCode: status,
                error: 'Not Found',
                message,
            });
        } else if (exception instanceof UnauthorizedException) {
            response.status(status).json({
                statusCode: status,
                error: 'Unauthorized',
                message,
            });
        } else if (exception instanceof BadRequestException) {
            response.status(status).json({
                statusCode: status,
                error: 'Bad Request',
                message,
            });
        } else {
            response.status(status).json({
                statusCode: status,
                error: 'Internal Server Error',
                message,
            });
        }
    }
}
