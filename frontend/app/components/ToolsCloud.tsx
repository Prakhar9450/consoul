import { OrbitingCircles } from "@/components/magicui/orbiting-circles";

const images = [
  "/icons/appier.svg",
  "/icons/appsflyer.svg",
  "/icons/clevertap.svg",
  
  "/icons/moengage.svg",
  "/icons/netcore.svg",
  "/icons/optimove.svg",
  "/icons/salesforce.svg",
  "/icons/servicenow.svg",
  "/icons/smartsheet.svg",
  "https://connect.redhat.com/s3api/prod-s3api/1722570002--6684036ceabc450680778892.png",
  "https://cdn.iconscout.com/icon/free/png-256/free-jira-icon-download-in-svg-png-gif-file-formats--logo-social-media-pack-logos-icons-1912014.png",
  "/icons/vtiger.svg",
  "https://images.seeklogo.com/logo-png/50/3/zoho-corporation-logo-png_seeklogo-506148.png",
];

// Split the images array into two groups for the two orbits
const outerOrbitImages = images.slice(0, 6); // First 7 images for outer orbit
const innerOrbitImages = images.slice(7);    // Remaining 6 images for inner orbit

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden">
      {/* Outer orbit - larger icons */}
      <OrbitingCircles iconSize={200} radius={200} reverse speed={0.5}>
        {outerOrbitImages.map((src, index) => (
          <div className="h-20 w-20 bg-white rounded-full flex justify-center drop-shadow-xl"><img key={index} src={src} alt={`icon-${index}`} className="w-full h-full" /></div>
        ))}
      </OrbitingCircles>

      {/* Inner orbit - smaller icons, faster speed */}
      <OrbitingCircles iconSize={120} radius={100} speed={0.5}>
        {innerOrbitImages.map((src, index) => (
         <div className="h-16 w-16 bg-white rounded-full flex justify-center shadow-xl"> <img key={index} src={src} alt={`icon-${index}`} className="w-50 h-50" /></div>
        ))}
      </OrbitingCircles>
    </div>
  );
}