export function PageShell({ title, children }) {
  return (
    <div className="flex items-center justify-center my-10">
      <div className="w-[30rem] border border-black">
        <div id="title-section" className="border-b border-black bg-cap-blue">
          <div className="p-10 font-bold text-white text-outline text-4xl">
            {title}
          </div>
        </div>
        <div id="mid-section" className="border-b">
          <div className="m-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
