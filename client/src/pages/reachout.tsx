export default function Reachout() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-[#111827]">Contact Us</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-lg text-gray-600 mb-6">
              Have questions or suggestions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#111827]">Email</h2>
                <p className="text-gray-600">support@snapcaption.com</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#111827]">Business Hours</h2>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM EST</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#111827]">Location</h2>
                <p className="text-gray-600">New York, NY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
