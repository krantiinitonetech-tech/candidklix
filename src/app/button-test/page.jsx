// src/app/button-test/page.jsx
import Button from "@/components/Button";

export default function ButtonTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-20 space-y-12">
      <h1 className="text-3xl font-heading">Button Component Test</h1>

      {/* Primary Buttons */}
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-heading">Primary</h2>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button variant="primary" size="sm">Primary SM</Button>
          <Button variant="primary" size="md">Primary MD</Button>
          <Button variant="primary" size="lg">Primary LG</Button>
        </div>
      </div>

      {/* Outline Buttons */}
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-heading">Outline</h2>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button variant="outline" size="sm">Outline SM</Button>
          <Button variant="outline" size="md">Outline MD</Button>
          <Button variant="outline" size="lg">Outline LG</Button>
        </div>
      </div>

      {/* Pill Buttons */}
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-heading">Pill</h2>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button variant="pill" size="sm">Pill SM</Button>
          <Button variant="pill" size="md">Pill MD</Button>
          <Button variant="pill" size="lg">Pill LG</Button>
        </div>
      </div>

      {/* Link Buttons */}
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-heading">As Links</h2>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button href="/services" variant="primary">Go to Services</Button>
          <Button href="/gallery" variant="outline">Go to Gallery</Button>
          <Button href="/booking" variant="pill">Book Now</Button>
        </div>
      </div>
    </div>
  );
}
