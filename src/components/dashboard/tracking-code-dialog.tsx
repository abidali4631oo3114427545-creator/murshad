"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Code, Copy, Check, Terminal } from "lucide-react"
import { firebaseConfig } from "@/firebase/config"
import { toast } from "@/hooks/use-toast"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function TrackingCodeDialog() {
  const [copied, setCopied] = useState(false)

  const trackingScript = `
<!-- MuRsHaD Real-time Tracking -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "${firebaseConfig.apiKey || "YOUR_API_KEY"}",
    authDomain: "${firebaseConfig.authDomain || "YOUR_AUTH_DOMAIN"}",
    projectId: "${firebaseConfig.projectId || "YOUR_PROJECT_ID"}",
    storageBucket: "${firebaseConfig.storageBucket || "YOUR_STORAGE_BUCKET"}",
    messagingSenderId: "${firebaseConfig.messagingSenderId || "YOUR_SENDER_ID"}",
    appId: "${firebaseConfig.appId || "YOUR_APP_ID"}"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const statsRef = doc(db, "stats", "current");

  // Track user arrival
  updateDoc(statsRef, {
    activeUsers: increment(1)
  }).catch(e => console.error("MuRsHaD Track Err:", e));

  // Track user departure
  window.addEventListener("beforeunload", () => {
    // Basic update on exit
    updateDoc(statsRef, {
      activeUsers: increment(-1)
    });
  });
</script>
`.trim()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingScript)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "MuRsHaD tracking code copied to clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer gap-2 py-2">
          <Terminal className="h-4 w-4" />
          <span>Tracking Code</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            MuRsHaD Tracking Setup
          </DialogTitle>
          <DialogDescription>
            Copy and paste this snippet into the <code>&lt;head&gt;</code> of your website to track real-time active users.
          </DialogDescription>
        </DialogHeader>
        <div className="relative mt-4">
          <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-[11px] font-mono leading-relaxed border border-border">
            {trackingScript}
          </pre>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 hover:bg-background/50"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-xs text-muted-foreground leading-tight">
            <strong>Note:</strong> Ensure your Firestore Security Rules allow <code>update</code> on <code>/stats/current</code>. 
            This script increments the count on page load and decrements it on page close.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
