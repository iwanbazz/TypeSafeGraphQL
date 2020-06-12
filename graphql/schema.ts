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
