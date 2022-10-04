import { Type } from "@sinclair/typebox";

export const ProductCreateSchema = Type.Object({
  name: Type.Object({ value: Type.String() }),
  active: Type.Object({ value: Type.Boolean() }),
  description: Type.Object({ value: Type.String() }),
  images: Type.Array(Type.Object({ value: Type.String() }), { maxItems: 8 }),
  files: Type.Array(
    Type.Object({
      filename: Type.String(),
      mimetype: Type.String(),
      _buf: Type.Any(),
    }),
    { maxItems: 8 }
  ),
});
