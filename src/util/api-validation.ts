import { NextResponse } from 'next/server';
import { ZodType } from 'zod';

type ValidationSuccessResult<TSchema> = {
  success: true;
  data: TSchema;
};

type ValidationErrorResult = {
  success: false;
  error: {
    message: string;
  };
};

type ValidationFunc<TSchema> = (
  obj: TSchema
) => ValidationSuccessResult<TSchema> | ValidationErrorResult;

type RequestFunc<TResponse> = (
  request: Request
) => Promise<NextResponse<TResponse>>;

export function zodValidator<TSchema>(schema: ZodType<TSchema>) {
  return (obj: TSchema) => {
    const validation = schema.safeParse(obj);
    if (validation.success) {
      return <const>{
        success: true,
        data: validation.data,
      };
    }
    return <const>{
      success: false,
      error: {
        message: validation.error.message,
      },
    };
  };
}
export const validatedApiRequest = <TResponse, TSchema>(
  req: RequestFunc<TResponse>,
  validationFunc?: ValidationFunc<TSchema>
) => {
  return async (request: Request) => {
    if (validationFunc) {
      const body = await request.clone().json();
      const validation = validationFunc(body);

      if (!validation.success) {
        return NextResponse.json(
          { error: validation.error.message },
          {
            status: 400,
          }
        );
      }
    }

    return req(request);
  };
};
