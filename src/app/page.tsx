import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="flex justify-between h-screen overflow-hidden items-center">
      <div className="text-[var(--main-red)] h-full flex flex-col justify-end items-start px-10 py-20">
        <div>
          <h1 className="text-4xl font-bold font-mono">Cashflow Guardian</h1>
          <p className="text-lg mt-4">
            Cashflow Guardian is a tool that helps you manage your cashflow. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
        <Button className="mt-4 bg-[var(--main-red)] text-white text-md font-mono">Get Started</Button>
      </div>
      <div className="bg-[var(--main-red)] h-[80vh] w-[50vw] rounded-l-3xl shrink-0"></div>
    </div>
  );
}
