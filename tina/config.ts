import { UsernamePasswordAuthJSProvider as UsernamePasswordAuthJSProvider, TinaUserCollection as TinaUserCollection } from "tinacms-authjs/dist/tinacms";
import { defineConfig as defineConfig, LocalAuthProvider as LocalAuthProvider } from "tinacms";
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
export default defineConfig({
    authProvider: isLocal ? new LocalAuthProvider() : new UsernamePasswordAuthJSProvider(),
    contentApiUrlOverride: "/api/tina/gql",
    build: {
        publicFolder: "public",
        outputFolder: "admin",
    },
    media: {
        tina: {
            mediaRoot: "",
            publicFolder: "public",
            static: true,
        },
    },
    schema: {
        collections: [
            TinaUserCollection,
            {
                name: "blog",
                label: "Blog Posts",
                path: "content/blog",
                format: "mdx",
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "string",
                        name: "slug",
                        label: "Slug",
                        required: true,
                    },
                    {
                        type: "datetime",
                        name: "date",
                        label: "Date",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "excerpt",
                        label: "Excerpt",
                        ui: {
                            component: "textarea",
                        },
                    },
                    {
                        type: "image",
                        name: "featured_image",
                        label: "Featured Image",
                    },
                    {
                        type: "string",
                        name: "tags",
                        label: "Tags",
                        list: true,
                    },
                    {
                        type: "boolean",
                        name: "published",
                        label: "Published",
                        required: true,
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body",
                        isBody: true,
                    },
                ],
            },
            {
                name: "project",
                label: "Projects",
                path: "content/projects",
                format: "mdx",
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "string",
                        name: "slug",
                        label: "Slug",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: {
                            component: "textarea",
                        },
                    },
                    {
                        type: "image",
                        name: "featured_image",
                        label: "Featured Image",
                    },
                    {
                        type: "string",
                        name: "technologies",
                        label: "Technologies",
                        list: true,
                    },
                    {
                        type: "string",
                        name: "live_url",
                        label: "Live URL",
                    },
                    {
                        type: "string",
                        name: "github_url",
                        label: "GitHub URL",
                    },
                    {
                        type: "datetime",
                        name: "date",
                        label: "Date",
                        required: true,
                    },
                    {
                        type: "boolean",
                        name: "featured",
                        label: "Featured",
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body",
                        isBody: true,
                    },
                ],
            },
            {
                name: "gallery",
                label: "Galleries",
                path: "content/galleries",
                format: "json",
                fields: [
                    {
                        type: "string",
                        name: "name",
                        label: "Gallery Name",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: {
                            component: "textarea",
                        },
                    },
                    {
                        type: "object",
                        name: "images",
                        label: "Images",
                        list: true,
                        fields: [
                            {
                                type: "string",
                                name: "filename",
                                label: "Filename",
                                required: true,
                            },
                            {
                                type: "image",
                                name: "url",
                                label: "Image",
                                required: true,
                            },
                            {
                                type: "image",
                                name: "thumbnail",
                                label: "Thumbnail",
                            },
                            {
                                type: "string",
                                name: "alt",
                                label: "Alt Text",
                                required: true,
                            },
                            {
                                type: "string",
                                name: "caption",
                                label: "Caption",
                            },
                        ],
                    },
                ],
            },
            {
                name: "about",
                label: "About",
                path: "content/about",
                format: "json",
                ui: {
                    allowedActions: {
                        create: false,
                        delete: false,
                    },
                },
                match: {
                    include: "about",
                },
                fields: [
                    {
                        type: "string",
                        name: "name",
                        label: "Name",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "bio",
                        label: "Bio",
                        ui: {
                            component: "textarea",
                        },
                    },
                    {
                        type: "image",
                        name: "avatar",
                        label: "Avatar",
                    },
                    {
                        type: "string",
                        name: "skills",
                        label: "Skills",
                        list: true,
                    },
                    {
                        type: "object",
                        name: "contact",
                        label: "Contact Information",
                        fields: [
                            {
                                type: "string",
                                name: "email",
                                label: "Email",
                            },
                            {
                                type: "string",
                                name: "github",
                                label: "GitHub URL",
                            },
                            {
                                type: "string",
                                name: "linkedin",
                                label: "LinkedIn URL",
                            },
                            {
                                type: "string",
                                name: "twitter",
                                label: "Twitter URL",
                            },
                        ],
                    },
                ],
            },
        ],
    }
});
