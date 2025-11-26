import Header from "../component/Header";

const AppInfo = () => {
  return (<div className="flex justify-center">
                 <Header header={"App Info"} />

    <div className="  w-full max-w-[560px] flex justify-center mt-[100px] ">
      <div className="w-[90%] max-w-md p-6 rounded-xl shadow-lg
        bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
      >
        <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">
          Welcome to Bankoo
        </h2>

        <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
          Here’s what you can do right now:
        </p>

        <ul className="space-y-1 text-sm text-neutral-800 dark:text-neutral-200 mb-6">
          <li>• Transfer funds to other registered users</li>
          <li>• Purchase airtime(SandBox only,use this number(08011111111))</li>
          <li>• Update your profile + avatar</li>
          <li>• View transaction history</li>
          <li>• Switch mode(Light to Dark and vise versa)</li>
        
        </ul>
        <h2 className="text-neutral-700 dark:text-neutral-300 text-[20px]">For Admin</h2>
        <ul className="space-y-1 text-sm text-neutral-800 dark:text-neutral-200 mb-6">
          <li>• View all users and their complete info </li>
          <li>• Soft delete users </li>    
        </ul>

       
      </div>
    </div>
    </div>
  );
};

export default AppInfo;
 