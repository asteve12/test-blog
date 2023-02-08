/** @type {import('next').NextConfig} */


const path = require('path')
const { i18n } = require("./next-i18next.config")

const nextConfig = {
  i18n,
  reactStrictMode: true,
  outputFileTracing: true,
  localePath: path.resolve('./public/locales')

}
module.exports = nextConfig
