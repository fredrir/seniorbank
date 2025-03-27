// "use client";
// import { useState } from "react";
// import PaymentFirstStep from "@/components/payment/PaymentFirstStep";
// import MediumPaymentSecondStep from "@/components/payment/MediumPaymentSecondStep";
// import MediumPaymentThirdStep from "@/components/payment/MediumPaymentThirdStep";
// import MediumPaymentFourthStep from "@/components/payment/MediumPaymentForthStep";
// import MediumPaymentFifthStep from "@/components/payment/MediumPaymentFifthStep";
// import toast from "react-hot-toast";


// export default function Payment() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     comment: "",
//     amount: "",
//     toAccount: "",
//     fromAccount: "",
//   });

//   const accountOptions = [
//     {
//       title: "Sparekonto", 
//       amount: 830726,
//     },
//     {
//       title: "Barnebarn",
//       amount: 34835,
//     },
//     {
//       title: "Russetid",
//       amount: 10835,
//     },
//   ];

//   const approvedAccountOptions = [
//     {
//       title: "Strømleverandør",
//       accountNumber: 18368237294,
//     },
//     {
//       title: "Husleie",
//       accountNumber: 48394724957,
//     },
//     {
//       title: "Mobilabonement",
//       accountNumber: 28459237593,
//     },
//   ];

//   const handleNext = () => {
//     setStep(step + 1);
//   };

//   const handleGoBack = () => {
//     setStep(step - 1);
//   };

//   const handleReset = () => {
//     setStep(1);
//     setFormData({
//       comment: "",
//       amount: "",
//       toAccount: "",
//       fromAccount: "",
//     });
//   };

//   const handleSubmit = () => {
//     //TODO: Temp console log
//     console.log(formData);
//     toast.success("Betalingen er gjennomført.");
//     setStep(step + 1);
//   };

//   const handleSelectFromAccount = (account: string) => {
//     console.log("Selected account:", account);
//     setFormData((prevData) => ({
//       ...prevData,
//       fromAccount: account,
//     }));
//   };
//   const handleSelectToAccount = (account: string) => {
//     console.log("Selected account:", account);
//     setFormData((prevData) => ({
//       ...prevData,
//       toAccount: account,
//     }));
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     e.preventDefault();
//     const { id, value } = e.target;
//     if (id === "amount") {
//       //TODO: Add restrictions so that the amount cannot be larger than the amount on the account
//       if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
//         setFormData((prevData) => ({
//           ...prevData,
//           [id]: value,
//         }));
//       } else {
//         toast.error("Beløpet må være et tall.");
//       }
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [id]: value,
//       }));
//     }
//   };

//   let stepComponent;

//   if (step === 1) {
//     stepComponent = (
//       <PaymentFirstStep
//         onSelectAccount={handleSelectFromAccount}
//         onClick={handleNext}
//         accountOptions={accountOptions}
//         selectedAccount={formData.fromAccount}
//       />
//     );
//   }

//   if (step === 2) {
//     stepComponent = (
//       <MediumPaymentSecondStep
//         onSelectAccount={handleSelectToAccount}
//         onClick={handleNext}
//         approvedAccountOptions={approvedAccountOptions}
//         onGoBack={handleGoBack}
//         selectedAccount={formData.toAccount}
//       />
//     );
//   }
//   if (step === 3) {
//     stepComponent = (
//       <MediumPaymentThirdStep
//         handleChange={handleChange}
//         formData={formData}
//         onGoBack={handleGoBack}
//         onClick={handleNext}
//         approvedAccountOptions={approvedAccountOptions}
//         selectedAmount={formData.amount}
//       />
//     );
//   }
//   if (step === 4) {
//     stepComponent = (
//       <MediumPaymentFourthStep
//         formData={formData}
//         onClick={handleSubmit}
//         onGoBack={handleGoBack}
//       />
//     );
//   }
//   if (step === 5) {
//     stepComponent = (
//       <MediumPaymentFifthStep formData={formData} onClick={handleReset} />
//     );
//   }
//   return (
//     <section>
//       <h1 className="mt-5 text-4xl font-bold text-white">Betal</h1>
//       <svg
//         viewBox="0 0 100 100"
//         preserveAspectRatio="none"
//         width={100}
//         height={100}
//         className="absolute left-0 top-0 z-[-1] h-[500px] w-full text-[#015aa4]"
//       >
//         <path d="M0 0 L0 50 Q50 100 100 50 L100 0" fill="currentColor" />
//       </svg>
//       {stepComponent}
//     </section>
//   );
// }
