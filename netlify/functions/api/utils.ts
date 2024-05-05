export function fmtFormData(
  reqBody: string,
  title: string,
  dealFieldsData: Record<string, string>[]
) {
  const jobFields = [
    "Job type",
    "Job source",
    "Job description",
    "Address",
    "Area",
    "Job date",
    "Job start time",
    "Job end time",
    "Test select",
  ];
  const jobFieldKeys = jobFields.map((field) => {
    return {
      name: field,
      key: dealFieldsData.find((d) => d.name == field)!.key,
    };
  });
  const formData: Record<string, string> = {};
  for (const [name, value] of Object.entries(
    JSON.parse(reqBody) as Record<string, string>
  )) {
    // TODO: validate with zod
    if (!["Job description", "email"].includes(name)) {
      if (!value.trim()) throw new Error();
    }
    if (
      [
        "first_name",
        "last_name",
        "phone",
        "email",
        "city",
        "state",
        "zip_code",
      ].includes(name)
    ) {
      // TODO: add contact person
      console.log(name, value);
    } else {
      formData[jobFieldKeys.find((field) => field.name == name)!.key] =
        value.trim();
    }
  }
  formData.title = title;
  return formData;
}
