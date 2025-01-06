type Props = {
  nickname: string;
};

export default function NicknameDisplay({ nickname }: Props) {
  return (
    <h2 className="font-bold text-h2 mb-2 text-center text-white break-keep">
      {nickname}님의 보따리에
    </h2>
  );
}
