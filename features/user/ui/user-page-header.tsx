export default function UserHeader({ usersData }: any) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gold mb-2">تایید کاربران</h1>
        <p className="text-cream/60">
          {usersData?.data.filter((u: any) => u.verify === false).length ?? 0}{" "}
          کاربر در انتظار تایید
        </p>
      </div>
    </div>
  );
}
