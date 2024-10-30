'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

type OnboardingData = {
  firstName: string
  lastName: string
  email: string
  companyName: string
  companySize: string
  industry: string
  productUse: string
  communicationPreference: string
}

export function OnboardingWizardComponent() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<OnboardingData>({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    companySize: '',
    industry: '',
    productUse: '',
    communicationPreference: ''
  })

  const updateFormData = (field: keyof OnboardingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    // Validate current step before proceeding
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        alert('Please fill in all fields')
        return
      }
    } else if (step === 2) {
      if (!formData.companyName || !formData.companySize || !formData.industry) {
        alert('Please fill in all fields')
        return
      }
    } else if (step === 3) {
      if (!formData.productUse || !formData.communicationPreference) {
        alert('Please fill in all fields')
        return
      }
    }
    setStep(prev => Math.min(prev + 1, 4))
  }

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    try {
      // Add the data to Firestore
      const docRef = await addDoc(collection(db, "onboarding"), formData);
      console.log("Document written with ID: ", docRef.id);
      alert("Thank you for submitting your information!");
      // Here you could redirect the user or show a success message
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting your information. Please try again.");
    }
  }

  return (
    <Card className="w-[550px] mx-auto">
      <CardHeader>
        <CardTitle>SaaS Onboarding</CardTitle>
        <CardDescription>Step {step} of 4</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 bg-secondary h-2 rounded-full">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input 
                id="firstName" 
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input 
                id="lastName" 
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input 
                id="companyName" 
                value={formData.companyName}
                onChange={(e) => updateFormData('companyName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size *</Label>
              <Select 
                value={formData.companySize} 
                onValueChange={(value) => updateFormData('companySize', value)}
                required
              >
                <SelectTrigger id="companySize">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Select 
                value={formData.industry} 
                onValueChange={(value) => updateFormData('industry', value)}
                required
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productUse">How do you plan to use our product? *</Label>
              <Select 
                value={formData.productUse} 
                onValueChange={(value) => updateFormData('productUse', value)}
                required
              >
                <SelectTrigger id="productUse">
                  <SelectValue placeholder="Select product use" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal use</SelectItem>
                  <SelectItem value="small-team">Small team</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Preferred method of communication *</Label>
              <RadioGroup 
                value={formData.communicationPreference} 
                onValueChange={(value) => updateFormData('communicationPreference', value)}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email-comm" />
                  <Label htmlFor="email-comm">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone-comm" />
                  <Label htmlFor="phone-comm">Phone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms-comm" />
                  <Label htmlFor="sms-comm">SMS</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Confirmation</h3>
            <p>Please review your information:</p>
            <div className="space-y-2">
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Company:</strong> {formData.companyName}</p>
              <p><strong>Company Size:</strong> {formData.companySize}</p>
              <p><strong>Industry:</strong> {formData.industry}</p>
              <p><strong>Product Use:</strong> {formData.productUse}</p>
              <p><strong>Communication Preference:</strong> {formData.communicationPreference}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={handlePrevious}>Previous</Button>
        )}
        {step < 4 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </CardFooter>
    </Card>
  )
}