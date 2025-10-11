import { LoginForm } from "@/components/login-form";
import Link from "next/link";
import logo from "@/assets/images/zarvaan.png";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#d7b46a] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#d7b46a] opacity-3 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <div className="flex justify-center items-center">
          <Image src={logo} alt="logo" width={200} height={200} />
        </div>

        {/* Login Card */}
        <div className="bg-[#FAF7F0] rounded-2xl shadow-2xl p-8 border border-[#d7b46a]/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#0F1724] mb-2">
              ورود به حساب
            </h2>
            <p className="text-[#6b6b6b]">
              برای دسترسی به پنل کاربری وارد شوید
            </p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-[#6b6b6b]">
              حساب کاربری ندارید؟{" "}
              <Link
                href="/register"
                className="text-[#d7b46a] hover:underline font-medium"
              >
                ثبت‌نام کنید
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
