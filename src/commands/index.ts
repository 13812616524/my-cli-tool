import commandCreate from "./create";

const commands = {
  "create <project-name>": {
    description: "create a project",
    option: [
      {
        cmd: "-f, --force",
        msg: "overwrite target dir if it exists",
      },
    ],
    action: commandCreate,
  },
};

export default commands;
