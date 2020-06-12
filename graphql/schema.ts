import { schema, use } from "nexus";
import { prisma } from "nexus-plugin-prisma";

use(prisma());

// Define object 'user'
schema.objectType({
  name: "user",
  definition(t) {
    t.model.id();
    t.model.name();
  },
});

//
/*
  Query a list of existing users.
  read more about directly access 'db' prop on 'ctx' obj :
  https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/crud
 */
schema.queryType({
  definition(t) {
    t.list.field("allUsers", {
      type: "user",
      resolve(_parent, _args, ctx) {
        return ctx.db.user.findMany();
      },
    });
    t.crud.user();
    t.crud.users();
  },
});

schema.mutationType({
  definition(t) {
    t.field("bigRedButton", {
      type: "String",
      async resolve(_parent, _args, ctx) {
        const { count } = await ctx.db.user.deleteMany({});
        return `${count} user(s) destroyed. Infinity gauntlet is working.`;
      },
    });
    t.crud.createOneuser();
    t.crud.deleteOneuser();
    t.crud.deleteManyuser();
    t.crud.updateOneuser();
    t.crud.updateManyuser();
  },
});
