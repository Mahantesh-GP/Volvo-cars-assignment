import React from "react";
import { ICarDetail } from "./models/ICarDetail";
import { useRouter } from "next/router";

export const CarsCard: React.FC<{ carItems: ICarDetail }> = ({ carItems }) => {
  const upperCase = (str: String): String => {
    return str.toUpperCase();
  };

  const router = useRouter();

  const redirectToLearn = (id: string) => {
    router.push("product");
  };

  const redirectToShop = (id: string) => {
    router.push("shop/" + id);
  };

  return (
    <div className="stack-8 justify-evenly items-center">
      <a
        aria-labelledby="card-heading-ex30"
        className="block px-16 pt-16 stack-24"
        onClick={() => redirectToLearn(carItems.id)}
      >
        <p className="heading-3" data-fluid-typography="min">
          {upperCase(carItems.bodyType)}
        </p>
        <div className="flex-row gap-16">
          <h1 className="heading-2 font-medium" data-fluid-typography="max">
            {carItems.modelName}
          </h1>
          <p className="heading-3" data-fluid-typography="min">
            {carItems.modelType}
          </p>
        </div>

        <div
          style={{
            aspectRatio: "aspect-16/9",
            overflow: "hidden",
            width: 400,
          }}
        >
          <img
            alt="A grey pure electric Volvo V90 Recharge standing still on grey floor in a studio."
            className="link-hover:scale-zoomed h-full transition-transform"
            src={carItems.imageUrl}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </a>
      <div className="px-24 stack-8 justify-center align-center">
        <div className="flex-row gap-32 pl-24">
          <a
            aria-labelledby="card-heading-ex30 card-action-ex30-learn"
            className="button-text"
            id="card-action-ex30-learn"
            onClick={() => redirectToLearn(carItems.id)}
          >
            Learn
          </a>

          <a
            aria-labelledby="card-heading-ex30 card-action-ex30-shop"
            className="button-text"
            id="card-action-ex30-shop"
            onClick={() => redirectToShop(carItems.id)}
          >
            Shop
          </a>
        </div>
      </div>
    </div>
  );
};
