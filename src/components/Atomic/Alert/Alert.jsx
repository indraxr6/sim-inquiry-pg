import "./Alert.css";

//alert component for sweetalert2

export const errorAlert = {
  icon: "error",
}

export const payAlert =  {
  icon: "question",
  title: "Do you want to pay this transaction?",
  showCancelButton: true,
  confirmButtonText: `Pay Transaction`,
  cancelButtonText: `Abort`,
  confirmButtonColor: "var(--blue)",
}

export const cancelAlert =  {
  icon: "info",
  title: "Are you sure want to cancel this transaction?",
  showCancelButton: true, 
  confirmButtonText: `Cancel Transaction`,
  cancelButtonText: `Abort`,
  confirmButtonColor: "var(--warning)", 
}

export default (payAlert, cancelAlert, errorAlert);

