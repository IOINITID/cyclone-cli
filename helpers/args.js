export const getArgs = (args) => {
  const [executer, file, ...rest] = args;

  rest.forEach((value, index, array) => {
    const result = {};

    if (value.charAt(0) === "-") {
      if (index === array.lenght - 1) {
        result[value.substring(1)] = true;
      } else if (array[index + 1].charAt(0) !== "-") {
        result[value.substring(1)] = array[index + 1];
      } else {
        result[value.substring(1)] = true;
      }
    }
  });

  return result;
};
