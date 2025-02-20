// import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

// export default function Contact() {
//   interface FormData {
//     name: string;
//     email: string;
//     phone: string;
//     message: string;
//   }

//   const { toast } = useToast();
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState<Partial<FormData>>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validate = (): boolean => {
//     let isValid = true;
//     const newErrors: Partial<FormData> = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required.";
//       isValid = false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required.";
//       isValid = false;
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Invalid email format.";
//       isValid = false;
//     }

//     const phoneRegex = /^\d{10}$/;
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required.";
//       isValid = false;
//     } else if (!phoneRegex.test(formData.phone)) {
//       newErrors.phone = "Phone number must be 10 digits.";
//       isValid = false;
//     }

//     if (!formData.message.trim()) {
//       newErrors.message = "Message is required.";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (validate()) {
//       toast({
//         title: "Success",
//         description: "Message sent successfully! We'll get back to you soon.",
//       });
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         message: "",
//       });
//       setErrors({});
//     }
//   };

//   return (
//     <div className="w-full min-h-[calc(100vh-4rem)] bg-[#18212C] flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//         <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Contact Us</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded-lg ${
//                 errors.name ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your name"
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded-lg ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded-lg ${
//                 errors.phone ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your phone number"
//             />
//             {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded-lg ${
//                 errors.message ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your message"
//               rows={4}
//             ></textarea>
//             {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ReachOut = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit number";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate()) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error sending message:", error);
        setStatus("An error occurred while sending your message. Please try again.");
      }

    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 via-transparent to-cyan-50/50" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-rose-200/20 rounded-full mix-blend-normal filter blur-3xl" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-sky-200/20 rounded-full mix-blend-normal filter blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Let's Start a Conversation
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Have a project in mind? We'd love to discuss how we can help bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Quick Contact</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-slate-500 text-sm">Email us at</p>
                    <p className="text-slate-800">info@snapcaption.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-cyan-600" />
                  <div>
                    <p className="text-slate-500 text-sm">Call us at</p>
                    <p className="text-slate-800">+91 9588480665</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-slate-500 text-sm">Visit us at</p>
                    <p className="text-slate-800">GCOEARA<br />Avasari, Manchar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200">
            {status && (
              <div className={`mb-6 p-4 rounded-lg ${status.includes("successfully") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {status.includes("successfully") ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <span>{status}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="w-full border p-3 rounded-lg" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email" className="w-full border p-3 rounded-lg" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" className="w-full border p-3 rounded-lg" />
              <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Your message" className="w-full border p-3 rounded-lg" />

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg">
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowRight className="w-4 h-4 inline-block ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReachOut;