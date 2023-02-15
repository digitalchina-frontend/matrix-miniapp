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
  ├── docs                          // vuepress v2
  │   ├── docs
  │   │   └── README.md
  │   └── package.json
  ├── domains
  │   └── finance
  │       ├── finance-admin-react   // react stack with multiple scenes
  │       └── finance-admin-vue3    // vue3 stack with multiple scenes
  ├── package-lock.json
  ├── package.json
  └── packages                      // shared js libs
    └── utils
  ```

- how it is organized

  - by domain

    - by solution tech stack
      - by domain scene / story

  - by documentation
  - by shared packages
