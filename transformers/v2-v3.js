import { assignName } from "../utils/assign-name";

const renamingMap = {
  entityTypes: "tagTypes",
  provides: "providesTags",
  invalidates: "invalidatesTags",
  addEntityTypes: "addTagTypes",
};

function transform(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Scope transformations to `createApi`
  const createApiCall = root.find(j.CallExpression, {
    callee: {
      name: "createApi",
      type: "Identifier",
    },
  });

  Object.keys(renamingMap).forEach((key) => {
    createApiCall
      .find(j.Identifier, {
        name: key,
      })
      .replaceWith((node) => assignName(node, renamingMap[key]));
  });

  // Scope transformations to `enhanceEndpoints`
  const enhanceEndpointsCall = root.find(j.CallExpression, {
    callee: {
      property: {
        name: "enhanceEndpoints",
      },
    },
  });

  Object.keys(renamingMap).forEach((key) => {
    enhanceEndpointsCall
      .find(j.Identifier, {
        name: key,
      })
      .replaceWith((node) => assignName(node, renamingMap[key]));
  });

  // Scope transformations to `injectEndpoints`
  const injectEndpointsCall = root.find(j.CallExpression, {
    callee: {
      property: {
        name: "injectEndpoints",
      },
    },
  });

  Object.keys(renamingMap).forEach((key) => {
    enhanceEndpointsCall
      .find(j.Identifier, {
        name: key,
      })
      .replaceWith((node) => assignName(node, renamingMap[key]));
  });

  return root.toSource();
}

module.exports = transform;
module.exports.parser = "ts";
