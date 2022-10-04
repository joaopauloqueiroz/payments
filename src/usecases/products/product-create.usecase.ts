import { IUseCase } from "@core/usecase";
import { IStripe, StripeService } from "@services/stripe";
import { Result } from "src/core/result";
import Stripe from "stripe";
import { inject, singleton } from "tsyringe";

export type IProductCreateUseCase = IUseCase<
  Stripe.ProductCreateParams,
  Stripe.Product
>;

@singleton<IProductCreateUseCase>()
export class ProductCreateUseCase implements IProductCreateUseCase {
  constructor(@inject(StripeService) private stripeService: IStripe) {}

  async execute(
    data: Stripe.ProductCreateParams
  ): Promise<Result<Stripe.Product>> {
    const product = (await this.stripeService.createProduct(data)).getValue();
    return Result.ok(product);
  }
}
