import  { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: 'uhekts5b',
    // projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: "2021-03-25",
    token:'skJrX64ArwQTutByNt1Vrg52FU55VvxPlpYFmcJmsprCILje9PzCLxKV91CrVDc5g5ObNQ9vbPpI7vIZSisNrFzvH4NrHOrT6TNrKHFE9HeuheVyQZOCfJIFtLT6OvrKVK1SnSnEzK0iRywuxX3xwB1pD93pS73d8m5DqQPwB1PkSz4SUt8m'
    // token:process.env.REACT_APP_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source);