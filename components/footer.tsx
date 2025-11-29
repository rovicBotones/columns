import { Phone } from "lucide-react";
import Image from "next/image"
export default function Footer() {
  var currentdate = new Date(); 
  return (
    <footer className="bg-foreground text-primary-foreground py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              
              <Image src="/rec-column-min2.png" alt="Description of my image" width={500} height={300} />
            </div>
            {/* <p className="text-primary-foreground/70 text-sm">
              Transforming ideas into reality through innovative digital solutions.
            </p> */}
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a href="#partner" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Development
                </a>
              </li>
              <li>
                <a className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Mobile Development
                </a>
              </li>
              <li>
                <a className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Digital Strategy
                </a>
              </li>
              <li>
                <a className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Design & UX
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <p>rovicbotones62@gmail.com</p> 
                </a>
              </li>
              <li>
                <a className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <p>+63 9665488613</p> 
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
          <p>&copy; {currentdate.getFullYear()} All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a  className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
