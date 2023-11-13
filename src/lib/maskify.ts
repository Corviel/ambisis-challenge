// Peguei esse código da lib Alpine.js que tem uma boa implementação de máscara de input e fiz o meu próprio uso dentro do Next. Nenhuma lib do React que eu achei tinha uma implementação tão boa quanto essa. Além de serem incompatíveis com o Next.js, já que as libs usavam componentes de classe do React por serem muito antigas.

function stripDown(template: string, input: string) {
  let inputToBeStripped = input;
  let output = "";
  let regexes = {
    "9": /[0-9]/,
    a: /[a-zA-Z]/,
    "*": /[a-zA-Z0-9]/,
  };

  let wildcardTemplate = "";

  // Strip away non wildcard template characters.
  for (let i = 0; i < template.length; i++) {
    if (["9", "a", "*"].includes(template[i])) {
      wildcardTemplate += template[i];
      continue;
    }

    for (let j = 0; j < inputToBeStripped.length; j++) {
      if (inputToBeStripped[j] === template[i]) {
        inputToBeStripped =
          inputToBeStripped.slice(0, j) + inputToBeStripped.slice(j + 1);

        break;
      }
    }
  }

  for (let i = 0; i < wildcardTemplate.length; i++) {
    let found = false;

    for (let j = 0; j < inputToBeStripped.length; j++) {
      if (
        regexes[wildcardTemplate[i] as keyof typeof regexes].test(
          inputToBeStripped[j],
        )
      ) {
        output += inputToBeStripped[j];
        inputToBeStripped =
          inputToBeStripped.slice(0, j) + inputToBeStripped.slice(j + 1);

        found = true;
        break;
      }
    }

    if (!found) break;
  }

  return output;
}

function buildUp(template: string, input: string) {
  let clean = Array.from(input);
  let output = "";

  for (let i = 0; i < template.length; i++) {
    if (!["9", "a", "*"].includes(template[i])) {
      output += template[i];
      continue;
    }

    if (clean.length === 0) break;

    output += clean.shift();
  }

  return output;
}

export function maskify(input: string, template: string) {
  if (!template) {
    return input;
  }

  // Let empty inputs be empty inputs.
  if (input === "") return "";

  let strippedDownInput = stripDown(template, input);
  let rebuiltInput = buildUp(template, strippedDownInput);

  return rebuiltInput;
}
