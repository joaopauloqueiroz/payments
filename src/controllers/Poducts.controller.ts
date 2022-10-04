import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, POST } from "fastify-decorators";
import { Authorization } from "@decorators/authorization";
import { ProductCreateSchema } from "@validations/products/create-product.schema";
import {
  IProductCreateUseCase,
  ProductCreateUseCase,
} from "@usecases/products/product-create.usecase";
import { container } from "tsyringe";
import Stripe from "stripe";
import { ICloudStorageService, CloudStorageService } from "@services/gcp";

export interface IRequestData {
  description: { value: string };
  activate: { value: boolean };
  name: { value: string };
  images: [{ value: string }];
  files: [{ _buf: Buffer; filename: string; mimetype: string }];
}

@Controller("/products")
export default class UserController {
  private readonly productCreateUseCase: IProductCreateUseCase;
  private readonly gcpService: ICloudStorageService;
  constructor() {
    this.productCreateUseCase =
      container.resolve<IProductCreateUseCase>(ProductCreateUseCase);
    this.gcpService =
      container.resolve<ICloudStorageService>(CloudStorageService);
  }
  @Authorization
  @POST("", { schema: { body: ProductCreateSchema } })
  async handlerCreateProduct(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as IRequestData;

    await this.gcpService.create(data.files[0]._buf, "aa");
    // const response = await this.productCreateUseCase.execute({
    //   name: data.name.value,
    //   description: data.description.value,
    //   active: data.activate.value,
    //   images: [],
    // } as Stripe.ProductCreateParams);
    res.send(201);
  }
}
