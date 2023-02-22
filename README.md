# Welcome

## Mono Repo

- how to use

  - install

    ```shell
    npm i
    ```

  - dev

    ```shell
    npm run dev
    ```

  - build

    ```shell
    npm run build
    ```

- deps installation

  - how to install deps for all projects

    ```shell
    npm install package-name -ws
    ```

  - how to install deps for specific project

    ```shell
    npm install package-name -w=@ma/project-name
    ```

  - how to install deps at root level

    ```shell
    npm install package-name -W
    ```

## Folder Structure

- print the folder structure

  - command # 🖥️ `mac`

    - `tree -L 3 -I 'node_modules|dist'`

  ```shell
  .
  ├── README.md
  ├── apps
  │   └── wechat
  │       ├── miniprogram
  │       └── project.config.json
  ├── changelog.config.js
  ├── commitlint.config.ts
  ├── docs                          // vuepress v2
  │   ├── README.md
  │   └── package.json
  ├── package-lock.json
  ├── package.json
  └── packages                      // shared js libs
      └── utils
          ├── package.json
          └── src
  ```

- how it is organized

  - by tech stack

    - by domain
      - by domain scene / story

  - by documentation
  - by shared packages
