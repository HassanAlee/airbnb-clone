import { createCategory } from "@/app/actions";
import { CreatioBottomBar } from "@/components/shared/creation-bottom-bar";
import { SelectCategory } from "@/components/shared/select-category";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>
      <form action={createCategory}>
        <input type="hidden" name="homeId" value={id} />
        <SelectCategory />
        <CreatioBottomBar />
      </form>
    </>
  );
}
