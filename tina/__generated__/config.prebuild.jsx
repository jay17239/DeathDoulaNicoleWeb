// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "."
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "."
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/blog",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              const date = /* @__PURE__ */ new Date();
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              const slug = values?.title?.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
              return `${year}-${month}-${day}-${slug}`;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            description: "A brief summary of the blog post",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
            description: "Optional featured image for the blog post"
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
            options: ["Nicole"]
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "End-of-Life Care",
              "Family Support",
              "Grief & Loss",
              "Resources",
              "Personal Reflections",
              "Professional Insights"
            ]
          },
          {
            type: "boolean",
            name: "published",
            label: "Published",
            description: "Check to make this post visible on the website"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "Quote",
                label: "Quote",
                fields: [
                  {
                    name: "quote",
                    label: "Quote",
                    type: "string",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    name: "author",
                    label: "Author",
                    type: "string"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
