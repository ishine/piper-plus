window.BENCHMARK_DATA = {
  "lastUpdate": 1792856827909,
  "repoUrl": "https://github.com/ishine/piper-plus",
  "entries": {
    "Python inference benchmark": [
      {
        "commit": {
          "author": {
            "email": "41669061+ayutaz@users.noreply.github.com",
            "name": "yousan",
            "username": "ayutaz"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "579d627432d2ffaea7497894406abc9894f31c96",
          "message": "fix(docker): runtime image から pip を外し、Trivy の pip 同梱 SBOM 由来の報告をなくす (#853)\n\n* fix(docker): runtime image から pip を削除し、 pip 同梱 SBOM 由来の Trivy 検知を抑止ではなく解消する\n\nTrivy が python-inference / python-inference-cpu-distroless /\nwebui-distroless で報告していた msgpack 1.1.2 (GHSA-6v7p-g79w-8964) と\nsetuptools 70.3.0 (CVE-2025-47273 / CVE-2026-59890) は、 pip 26.x が同梱する\nCycloneDX SBOM `pip/_vendor/bom.cdx.json` から来ていた。 SBOM 由来なので\nFilePath と license が空になり、 これを「実体のない報告」と読んで\n.trivyignore.yaml で抑止していたが、 コードは pip の中に実在する。\n同じ SBOM から urllib3 2.7.0 (CVE-2026-97687/97688/97689) も報告されていた。\npython:3.13-slim-trixie で `vendor.txt` を消しても結果は変わらず、\n`bom.cdx.json` を消すと全部消えることを Trivy 0.67.2 / 0.76.1 で確認した。\n\n- 実行時に pip を使わない runtime image (python-inference の CUDA / CPU /\n  CPU distroless、 webui / webui distroless、 wyoming の builder と runtime)\n  で、 最後の install の後に pip を削除する。 CUDA image は apt の\n  python3-pip も purge する。 setuptools / wheel / uv は残す。\n- 各 Dockerfile に、 pip を import できるか `pip/_vendor` が残っていれば\n  ビルドを失敗させる確認を付けた。\n- 公式 python: image を base にする 5 本は `pip install --ignore-installed\n  --upgrade` から pip を外した。 base の pip と版が違うと dist-info が 2 つ\n  重なり、 uninstall が片方しか消せない (webui の python:3.13.13 /\n  wyoming の 3.13.15 で上の確認がビルドを止めた)。\n- .trivyignore.yaml の 3 件の抑止を外し、 `vulnerabilities: []` として残す。\n  冒頭のコメントを正しい原因に直した。\n- tests/scripts/test_runtime_images_ship_no_pip.py を追加。 docker/ 以下と\n  Trivy workflow の matrix の Dockerfile を読み、 pip 削除とビルド時確認の\n  位置、 抑止の書式 (版付き PURL / expired_at) と pip 同梱版の再抑止を検査\n  する。 pre-commit hook と trivy-container-scan.yml の gate-script-tests\n  job で実行し、 workflow の paths にも追加した。\n- python-train / cpp-dev は開発用 image のため対象外 (理由はテスト内)。\n\n確認: webui-distroless と python-inference-cpu-distroless を実ビルドして\nTrivy で比較し、 CUDA image は base を ubuntu:24.04 に替えた代替ビルドで\n確認した。 詳細は docs/design/trivy-pip-vendor-findings-2026-10-24.md。\n\nRefs #748\n\n* test(docs): 設計書に加えたコード例 2 件を docs の監査 snapshot に載せる\n\n* docs(design): pip の同梱一覧のコードブロックに言語を付ける (MD040)\n\n* fix(ci): pip を外した python-inference の中のテスト依存を uv で入れる\n\ndocker-test.yml の OpenAI API テストが image の中で pip install を呼び、\npip: command not found で失敗した。-u root で uv pip install --system を\n使う。test_runtime_images_ship_no_pip.py は workflow が runtime image の\n中で pip を呼ぶことも検出する。",
          "timestamp": "2026-10-25T00:28:16+09:00",
          "tree_id": "3b76cc2320e89dcd00f51f75fd1e412481d2d44f",
          "url": "https://github.com/ishine/piper-plus/commit/579d627432d2ffaea7497894406abc9894f31c96"
        },
        "date": 1792856826571,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "RTF (en)",
            "value": 0.0482,
            "unit": "ratio"
          },
          {
            "name": "Latency P50 (en)",
            "value": 11.6,
            "unit": "ms"
          },
          {
            "name": "Latency P95 (en)",
            "value": 16.7,
            "unit": "ms"
          },
          {
            "name": "Cold Start (en)",
            "value": 636.3,
            "unit": "ms"
          },
          {
            "name": "Peak Memory (en)",
            "value": 217.7,
            "unit": "MB"
          },
          {
            "name": "Model Size (en)",
            "value": 37.6,
            "unit": "MB"
          }
        ]
      }
    ]
  }
}