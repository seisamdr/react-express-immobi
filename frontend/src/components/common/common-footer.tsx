import { Link } from "react-router-dom";

const CommonFooter = () => {
  return (
    <>
      <div className="w-screen flex flex-col px-32 bg-black">
        <div className="w-content flex justify-between gap-5 py-5">
          <Link to="/">
            <img src="/immobi.png" className="w-[124px] h-[28px]" />
          </Link>
          <div className="text-slate-300">
            Copyright © 2024{" "}
            <Link className="text-carrot" to={"/"}>
              Immobi
            </Link>{" "}
            All Right Reserved
          </div>
          <div className="text-slate-300">
            Made by{" "}
            <a
              href="https://www.linkedin.com/in/seiryopramanda/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-leaf">@seiryopramanda</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonFooter;
