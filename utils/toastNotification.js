import toast from "react-hot-toast";

const notify = (msg, status, config) => {
  const defaultConfig = {
    duration: 5000,
    style: {
      minWidth: "500px",
      color: status === "error" ? "#96150c" : "#007009",
      textAlign: "center",
      //   backgroundColor:
      //     status === "error"
      //       ? "rgba(252, 0, 21, 0.80)"
      //       : "rgba(0, 252, 21, 0.32)",
    },

    icon: status === "error" ? "🔥" : "👌",
  };

  const toastConfig = {
    ...defaultConfig,
    ...config,
    style: {
      ...defaultConfig.style,
      ...config?.style,
    },
  };

  return toast[status](msg, toastConfig);
};

export default notify;
