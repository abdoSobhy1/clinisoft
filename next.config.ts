import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...(fileLoaderRule.resourceQuery?.not ?? []), /url/],
        }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: "removeViewBox",
                    active: false,
                  },
                  {
                    name: "removeDimensions",
                    active: true,
                  },
                ],
              },
              // ✅ Add this to override SVG fill with currentColor
              prettier: false,
              jsx: {
                babelConfig: {
                  plugins: [
                    [
                      "@svgr/babel-plugin-add-jsx-attribute",
                      {
                        elements: ["svg"],
                        attributes: [{ name: "fill", value: "currentColor" }],
                      },
                    ],
                  ],
                },
              },
            },
          },
        ],
      }
    );

    // Modify the file loader rule to ignore *.svg
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);

