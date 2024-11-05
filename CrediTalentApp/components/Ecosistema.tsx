import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const companies = [
  {
    name: "Chipi Pay",
    image: "/assets/chipi-chunky.png?height=200&width=300",
    alt: "Paga con Criptos graffiti"
  },
  {
    name: "Basenames",
    image: "/assets/hermosillo-base.svg?height=200&width=300",
    alt: "Basenames search interface"
  },
  {
    name: "Bando",
    image: "/assets/xoc-bando.jpeg?height=200&width=300",
    alt: "Bando crypto transfer promotion"
  }
]

export default function Component() {
  return (
        <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Ecosistema del Talento</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {companies.map((company, index) => (
                    <div key={index} className="flex flex-col items-center px-4">
                    <h3 className="text-xl font-semibold mb-2">{company.name}</h3>
                    <img 
                        src={company.image} 
                        alt={company.alt}
                        className="w-full h-48 object-contain rounded-md"
                    />
                    </div>
                ))}
                </div>

            </div>
        </CardContent>
        </Card>
  )
}