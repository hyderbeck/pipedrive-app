/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export async function addDeal(
  pipedrive,
  apiClient,
  formData: Record<string, string>,
  title: string
) {
  const dealsApi = new pipedrive.DealsApi(apiClient);
  const opts = pipedrive.NewDeal.constructFromObject(formData);
  await dealsApi.addDeal(opts);
  const dealsData = (await dealsApi.getDeals({})).data;
  const dealId = dealsData.find((d) => {
    return d.title == title;
  })!.id;
  return String(dealId);
}
