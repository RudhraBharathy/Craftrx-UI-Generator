import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-white border-border pt-14 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-center items-center ">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Craftrx UI Generator. All rights
            reserved.
          </p>
          <p className="text-sm mt-4">
            Made with 🤍{" "}
            <a href="https://www.rudhrabharathy.github.io">Rudhra Bharathy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
